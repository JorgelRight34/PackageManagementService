import { useEffect, useRef, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyNavbar from '../Navbar.jsx';

function Estados() {
    const [trackings, setTrackings] = useState([]);

    const [form, setForm] = useState({
        trackingId: '',
        packageId: '',
        status: '',
        timestamp: '',
        location: '',
    });

    const [createModalIsOpen, setCreateModal] = useState(false);
    const [editModalIsOpen, setEditModal] = useState(false);

    let packagesId = useRef([]);

    const api = 'api/tracking';

    const clearForm = () => {
        setForm({
            trackingId: '',
            packageId: '',
            status: '',
            timestamp: '',
            location: '',
        });
    };

    const areFieldsEmpty = () => {
        if (
            !form.packageId ||
            !form.status ||
            !form.timestamp ||
            !form.location
        ) {
            return true;
        }
        return false;
    };

    const areFieldsDifferent = () => {
        const preValues = trackings.find(track => track.trackingId === form.trackingId);
        if (
            form.trackingId == preValues?.trackingId &&
            form.packageId === preValues?.packageId &&
            form.status === preValues?.status &&
            form.timestamp === preValues?.timestamp &&
            form.location === preValues?.location
        ) {
            return true;
        }
        return false;
    };

    const getErrorsFromResponse = (response) => {
        let err = '';
        for (var error in response.errors) {
            if (error == 'tracking') {
                continue; // This is a PK error, it doesnt matter for the user.
            }
            let errmsg = String(response.errors[error]).split('.')[0]; // To avoid knowing the line where the code failed.
            err += `${error}: ${errmsg}`;
        }
        return err;
    }

    const extractTrackNumber = (trackingId) => {
        // Remove the "PK" prefix and parse the remaining string as an integer
        const numberPart = trackingId.slice(5);
        return parseInt(numberPart, 10);
    }

    const isFormValid = () => {
        let errorMsg = "";
        let valid = true;


        const validateTimestamp = () => {
            const datetimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
            if (!datetimePattern.test(form.timestamp)) {
                errorMsg += 'El tiempo debe seguir el formato: YYYY-MM-DDTHH:MM:SS .\n';
                valid = false;
            }
        }

        validateTimestamp();

        if (areFieldsEmpty()) {
            errorMsg += "No se permiten campos vacios";
            valid = false;
        }

        if (!valid) {
            alert(errorMsg);
        }
        return valid;
    };


    const showEditForm = (index) => {
        const newFormValues = [...trackings][index];
        setForm(newFormValues);
        setEditModal(true);
    };

    // CRUD FUNCTIONS.

    const deleteTrack = async (index, track) => {
        const confirmation = window.confirm(`Estás seguro que quieres eliminar el envio ${track.trackingId}?`);
        // Check if the user clicked "Yes"
        if (confirmation) {
            const response = await fetch(`${api}/${extractTrackNumber(track.trackingId)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 204) {
                let newTrackings = [...trackings];
                newTrackings.splice(index, 1);
                setTrackings(newTrackings);
            } else {
                alert(getErrorsFromResponse(await response.json()));
            }
        }
    };

    const edit = async () => {
        if (isFormValid()) {
            const index = trackings.findIndex(track => track.trackingId === form.trackingId);
            const trackToEdit = trackings[index];

            // construc the body for the request.
            const body = {
                packageId: form.packageId,
                status: form.status,
                timestamp: form.timestamp,
                location: form.location,
            };

            const response = await fetch(`${api}/${extractTrackNumber(trackToEdit.trackingId)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type
                },
                body: JSON.stringify(body)
            });

            if (response.status == 200) {
                const newTrackings = [...trackings];
                newTrackings[index] = form; // Swap with the updated values.
                setTrackings(newTrackings);

            } else {
                alert(getErrorsFromResponse(await response.json()));
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
                status: form.status,
                timestamp: form.timestamp,
                location: form.location
            };
            // setNPackages(prev => prev + 1);
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            let reJson = await response.json(); // Turn response into JSON.
            if (response.status == 201) {
                let newTrackings = reJson; // The api returns the new created package.
                setTrackings(prev => {
                    return [...prev, newTrackings];
                });
            } else {
                alert(getErrorsFromResponse(reJson));
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
        async function populateTrackings() {
            const response = await fetch(api);
            const data = await response.json();
            setTrackings(data);
        }

        async function getPackagesId() {
            // fILL packagesId list with all the packages availabble, so they can be loaded in the select field when creating a shipment.
            const response = await fetch('api/package');
            const data = await response.json()
            packagesId.current = data.map(pkg => pkg.packageId);
        }

        populateTrackings();
        getPackagesId();
    }, []) // Cuando inicie la pagina agarra los paquetes de la api.

    return (
        <>
            <MyNavbar />
            <div className="container">
                <div className="mt-4">
                    <h1>Actualizaciones de Estado</h1>
                </div>

                <div className="container d-flex justify-content-start">
                    <button className="btn btn-secondary" onClick={() => setCreateModal(true)}>
                        Agregar Actualizacion de Estado
                    </button>
                </div>

                <table className="table mt-2">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>PaqueteId</th>
                            <th>Estado</th>
                            <th>Localizacion</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {trackings.map((track, idx) => {
                            return (
                                <tr key={track.trackingId}>
                                    <td>
                                        {track.trackingId}
                                    </td>
                                    <td>
                                        {track.packageId}
                                    </td>
                                    <td>
                                        {track.status}
                                    </td>
                                    <td>
                                        {track.location}
                                    </td>
                                    <td>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash3-fill cursor-pointer"
                                            viewBox="0 0 16 16"
                                            onClick={() => deleteTrack(idx, track)}
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
                        <h2>{createModalIsOpen ? 'Agregar nueva actualizacion de estado' : `Editar actualizacion de estado: ${form.trackingId}`}</h2>
                    </ModalHeader>
                    <ModalBody>

                        {editModalIsOpen &&
                            <div className="row mb-3 align-items-center">
                                <div className="col-auto">
                                    <label htmlFor="shipmentId" className="col-form-label fw-bold">
                                    TrackingId
                                    </label>
                                </div>
                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control-plaintext"
                                        readOnly
                                        id="trackingIdId"
                                        value={form.trackingId}
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

                                        {packagesId.current.map(pkg => {
                                            return (
                                                <option key={pkg} value={pkg}>{pkg}</option>
                                            );
                                        })}

                                    </select>
                                </div>
                            }
                            {editModalIsOpen && form.packageId}
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="timestamp" className="col-form-label fw-bold">
                                    Tiempo (YYYY-MM-DDTHH:MM:SS.SSS)
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="timestamp"
                                    value={form.timestamp}
                                    onChange={e =>
                                        setForm(prev => ({ ...prev, timestamp: e.target.value }))}
                                    placeholder="YYYY-MM-DDTHH:MM:SS.SSS"
                                />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="currrentLocation" className="col-form-label fw-bold">
                                    Estado
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="currrentLocation"
                                    value={form.status}
                                    onChange={e =>
                                        setForm(prev => ({ ...prev, status: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="location" className="col-form-label fw-bold">
                                    Localizacion
                                </label>
                            </div>
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    value={form.location}
                                    onChange={e =>
                                        setForm(prev => ({ ...prev, location: e.target.value }))}
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

export default Estados;