import { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyNavbar from '../Navbar.jsx';
import showNotification from '../../toastNotifications.js';

function Envios() {
    const [shipments, setShipments] = useState([]);

    const [form, setForm] = useState({
        shipmentId: '',
        packageId: '',
        departureTime: '',
        arrivalTime: '',
        currentLocation: '',
    });

    const [createModalIsOpen, setCreateModal] = useState(false);
    const [editModalIsOpen, setEditModal] = useState(false);

    let packagesId = useRef([]);

    const api = 'api/shipment';

    const extractShipNumber = (shipmentId) => {
        // Remove the "PK" prefix and parse the remaining string as an integer
        const numberPart = shipmentId.slice(4);
        return parseInt(numberPart, 10);
    }

    const clearForm = () => {
        setForm({
            shipmentId: '',
            packageId: '',
            departureTime: '',
            arrivalTime: '',
            currentLocation: '',
        });
    };

    const areFieldsEmpty = () => {
        if (
            !form.packageId ||
            !form.departureTime ||
            !form.arrivalTime ||
            !form.currentLocation
        ) {
            return true;
        }
        return false;
    };

    const areFieldsDifferent = () => {
        const preValues = shipments.find(ship => ship.shipmentId === form.shipmentId);
        if (
            form.shipmentId === preValues?.shipmentId &&
            form.packageId === preValues?.packageId &&
            form.departureTime === preValues?.departureTime &&
            form.arrivalTime === preValues?.arrivalTime &&
            form.currentLocation == preValues?.currentLocation
        ) {
            return true;
        }
        return false;
    };

    const getErrorsFromResponse = (response) => {
        let err = '';
        for (var error in response.errors) {
            if (error == 'shipment') {
                continue; // This is a PK error, it doesnt matter for the user.
            }
            let errmsg = String(response.errors[error]).split('.')[0]; // To avoid knowing the line where the code failed.
            err += `${error}: ${errmsg}`;
        }
        return err;
    }

    const isFormValid = () => {
        let errorMsg = "";
        let valid = true;
        

        const validateDepartureAndArrival = () => {
            const datetimePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?)?$/;
            const departure = new Date(form.departureTime);
            const arrival = new Date(form.arrivalTime);
            if (!datetimePattern.test(form.departureTime) || !datetimePattern.test(form.arrivalTime)) {
                errorMsg += 'La partida y llegada deben seguir el formato: YYYY-MM-DDTHH:MM:SS.SSS.\n';
                valid = false;
            } else if (departure >= arrival){   
                errorMsg += "El tiempo de partida no puede ser igual o mayor al tiempo de llegada.\n";
                valid = false;
            }
        }

        validateDepartureAndArrival();

        if (areFieldsEmpty()) {
            errorMsg += "No se permiten campos vacios";
            valid = false;
        }

        if (!valid) {
            showNotification(errorMsg, false);
        }
        return valid;
    };


    const showEditForm = (index) => {
        const newFormValues = [...shipments][index];
        setForm(newFormValues);
        setEditModal(true);
    };

    // CRUD FUNCTIONS.

    const deleteShip = async (index, ship) => {
        const confirmation = window.confirm(`Estás seguro que quieres eliminar el envio ${ship.shipmentId}?`);
        // Check if the user clicked "Yes"
        if (confirmation) {
            const response = await fetch(`${api}/${extractShipNumber(ship.shipmentId)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 204) {
                let newShipments = [...shipments];
                newShipments.splice(index, 1);
                showNotification(`${ship.shipmentId} ha sido eliminado`, true);
                setShipments(newShipments);
            } else {
                showNotification(getErrorsFromResponse(await response.json()), false);
            }
        }
    };

    const edit = async () => {
        if (isFormValid()) {
            const index = shipments.findIndex(ship => ship.shipmentId === form.shipmentId);
            const shipToEdit = shipments[index];

            // construc the body for the request.
            const body = {
                packageId: form.packageId,
                departureTime: form.departureTime,
                arrivalTime: form.arrivalTime,
                currentLocation: form.currentLocation,
            };

            const response = await fetch(`${api}/${extractShipNumber(shipToEdit.shipmentId)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type
                },
                body: JSON.stringify(body)
            });

            if (response.status == 200) {
                const newPackages = [...shipments];
                newPackages[index] = form; // Swap with the updated values.
                setShipments(newPackages);
                showNotification(`${shipToEdit.shipmentId} ha sido editado.`, true);
            } else {
                showNotification(getErrorsFromResponse(await response.json()), false);
                return;
            }
            // Close the dialog.
            clearForm();
            setEditModal(false);
        }
    };

    async function insert() {
        if (isFormValid()) {
            const body = {
                packageId: form.packageId,
                departureTime: form.departureTime,
                arrivalTime: form.arrivalTime,
                currentLocation: form.currentLocation,
            };
            // setNPackages(prev => prev + 1);
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const reJson = await response.json();
            if (response.status == 201) {
                let newShipments = reJson; // The api returns the new created package.
                setShipments(prev => {
                    return [...prev, newShipments];
                });
                showNotification("El envio fue registrado", true);
            } else {
                showNotification(getErrorsFromResponse(reJson), false);
                return;
            }
            clearForm();
            setCreateModal(false);
        }
    };

    const cancel = () => {
        setCreateModal(false);
        setEditModal(false);
        clearForm();
    };

    useEffect(() => {
        async function populateShipmentsData() {
            const response = await fetch(api);
            const data = await response.json();
            setShipments(data);
        }

        async function getPackagesId() {
            // fILL packagesId list with all the packages availabble, so they can be loaded in the select field when creating a shipment.
            const response = await fetch('api/package');
            const data = await response.json()
            packagesId.current = data.map(pkg => pkg.packageId);
            console.log(data, packagesId);
        }

        populateShipmentsData();
        getPackagesId();
    }, []) // Cuando inicie la pagina agarra los paquetes de la api.

    return (
        <>
            <MyNavbar />
            <div className="container">
                <div className="mt-4">
                    <h1>Envios</h1>
                </div>

                <div className="container d-flex justify-content-start">
                    <button className="btn btn-secondary" onClick={() => setCreateModal(true)}>
                        Agregar Envio
                    </button>
                </div>

                <table className="table mt-2">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Paquete</th>
                            <th>Partida</th>
                            <th>Llegada</th>
                            <th>Localizacion actual</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((ship, idx) => {
                            return (
                                <tr key={ship.shipmentId}>
                                    <td>
                                        {ship.shipmentId}
                                    </td>
                                    <td>
                                        {ship.packageId}
                                    </td>
                                    <td>
                                        {ship.departureTime}
                                    </td>
                                    <td>
                                        {ship.arrivalTime}
                                    </td>
                                    <td>
                                        {ship.currentLocation}
                                    </td>
                                    <td>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash3-fill cursor-pointer"
                                            viewBox="0 0 16 16"
                                            onClick={() => deleteShip(idx, ship)}
                                        >
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </td>
                                    <td>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-pencil-square cursor-pointer"
                                            viewBox="0 0 16 16"
                                            onClick={() => showEditForm(idx)}
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Modal isOpen={createModalIsOpen || editModalIsOpen}>
                    <ModalHeader>
                        <h2>{createModalIsOpen ? 'Agregar nuevo envio' : `Editar envio: ${form.shipmentId}`}</h2>
                    </ModalHeader>
                    <ModalBody>

                        {editModalIsOpen &&
                            <div className="row mb-3 align-items-center">
                                <div className="col-auto">
                                    <label htmlFor="shipmentId" className="col-form-label fw-bold">
                                        ShipmentId
                                    </label>
                                </div>
                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control-plaintext"
                                        readOnly
                                        id="shipmentId"
                                        value={form.shipmentId}
                                    />
                                </div>
                            </div>
                        }

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="packageId" className="col-form-label fw-bold">
                                PackageId
                                </label>
                            </div>
                            {createModalIsOpen &&
                                <div className="col-auto">
                                    <select
                                        className="form-select"
                                        value={form.packageId}
                                        id="packageId"
                                        onChange={e =>
                                            setForm(prev => ({ ...prev, packageId: e.target.value }))}>
                                        <option value='' disabled>----</option>
                                        {packagesId.current.map(pkg => {
                                            return (
                                                <option key={pkg} value={pkg}>{pkg}</option>
                                            );
                                        })}

                                    </select>
                                </div>
                            }
                            {editModalIsOpen && form.packageId }
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="departureTime" className="col-form-label fw-bold">
                                   Partida (YYYY-MM-DDTHH:MM:SS.SSS)
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="departureTime"
                                    value={form.departureTime}
                                    onChange={e =>
                                        setForm(prev => ({ ...prev, departureTime: e.target.value }))}
                                    placeholder="YYYY-MM-DDTHH:MM:SS.SSS"
                                />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="arrivalTime" className="col-form-label fw-bold">
                                    Llegada (YYYY-MM-DDTHH:MM:SS.SSS)
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="arrivalTime"
                                    value={form.arrivalTime}
                                    onChange={e =>
                                        setForm(prev => ({ ...prev, arrivalTime: e.target.value }))}
                                    placeholder="YYYY-MM-DDTHH:MM:SS.SSS"
                                />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="currrentLocation" className="col-form-label fw-bold">
                                    Localizacion actual
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="currrentLocation"
                                    value={form.currentLocation}
                                    onChange={e =>
                                        setForm(prev => ({ ...prev, currentLocation: e.target.value }))}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            createModalIsOpen &&
                            <button className="btn btn-primary" onClick={insert} disabled={areFieldsEmpty()}>
                                Insertar
                            </button>
                        }
                        {
                            editModalIsOpen &&
                            <button className="btn btn-primary" onClick={edit} disabled={areFieldsDifferent() && !areFieldsEmpty() ? true : false}>
                                Editar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={cancel}>
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>

            </div>
        </>
    );

}

export default Envios;