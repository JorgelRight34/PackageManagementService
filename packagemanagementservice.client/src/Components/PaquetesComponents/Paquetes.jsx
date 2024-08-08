import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import MyNavbar from '../Navbar.jsx';

function Paquetes() {
  const [packages, setPackages] = useState([
    {
      packageId: "PKG0001",
      senderName: "Pedro Perez",
      receiverName: "Juan Soto",
      origin: "San Cristobal",
      destination: "Samaná",
      weight: 2.5,
      status: "Pending",
      estimatedDelivery: "2024-08-25",
    },
    {
      packageId: "PKG0002",
      senderName: "Vicente Vegazo",
      receiverName: "Luis Tavarez",
      origin: "Santiago",
      destination: "Baní",
      weight: 4.0,
      status: "Completed",
      estimatedDelivery: "2024-07-25",
    },
  ]);

  const [form, setForm] = useState({
    packageId: "",
    senderName: "",
    receiverName: "",
    origin: "",
    destination: "",
    weight: 0.0,
    status: "pending",
    estimatedDelivery: "",
  });

  const [createModalIsOpen, setCreateModal] = useState(false);
  const [editModalIsOpen, setEditModal] = useState(false);

  const [nPackages, setNPackages] = useState(2);

  const deletePkg = (index, pkg) => {
    const d = window.confirm(`Estás seguro que quieres eliminar el paquete ${pkg.packageId}?`)
    let newPackages = [...packages];
    newPackages.splice(index, 1);
    setPackages(newPackages);
  }

  const getNextId = () => {
    return (
      "PKG" + "0".repeat(4 - nPackages.toString().length) + (nPackages + 1)
    );
  };

  const clearForm = () => {
    setForm({
      packageId: "",
      senderName: "",
      receiverName: "",
      origin: "",
      destination: "",
      weight: 0.0,
      status: "pending",
      estimatedDelivery: "",
    });
  };

  const areFieldsEmpty = () => {
    if (
      !form.senderName ||
      !form.receiverName ||
      !form.origin ||
      !form.destination ||
      !form.estimatedDelivery
    ) {
      return true;
    }
    return false;
  };

  const areFieldsDifferent = () => {
    const preValues = packages.find(pkg => pkg.packageId === form.packageId);
    if (
      form.senderName === preValues?.senderName &&
      form.receiverName === preValues?.receiverName &&
      form.origin === preValues?.origin &&
      form.destination === preValues?.destination &&
      form.estimatedDelivery === preValues?.estimatedDelivery
    ) {
      return true;
    }
    return false;
  };

  const isFormValid = () => {
    let errorMsg = "";
    let valid = true;
    if (areFieldsEmpty()) {
      errorMsg += "No se permiten campos vacios";
      valid = false;
    } else if (form.receiverName === form.senderName) {
      errorMsg += "El remitente no puede ser también el recibidor.\n";
      valid = false;
    } else if (form.origin === form.destination) {
      errorMsg += "El origen no puede ser igual al destino.";
      valid = false;
    }

    if (!valid) {
      alert(errorMsg);
    }
    return valid;
  };

  const showEditForm = index => {
    const newFormValues = [...packages][index];
    setForm(newFormValues);
    setEditModal(true);
  };

  const edit = () => {
    if (isFormValid()) {
      const index = packages.findIndex(pkg => pkg.packageId === form.packageId);
      const newPackages = packages.map((pkg, idx) => {
        if (idx === index) {
          return form;
        }
        return pkg;
      });
      setPackages(newPackages);
    }
    clearForm();
    setEditModal(false);
  };

  const insert = () => {
    if (isFormValid()) {
      const nextId = getNextId();
      setNPackages(prev => prev + 1);
      setPackages(prev => {
        return [
          ...prev,
          {
            packageId: nextId,
            senderName: form.senderName,
            receiverName: form.receiverName,
            origin: form.origin,
            destination: form.destination,
            weight: form.weight,
            status: form.status,
            estimatedDelivery: form.estimatedDelivery,
          },
        ];
      });
      clearForm();
      setCreateModal(false);
    }
  };

  const cancel = () => {
    setCreateModal(false);
    setEditModal(false);
    clearForm();
  };

  return (
    <>
    <MyNavbar />
    <div className="container">
      <div className="mt-4">
        <h1>Paquetes</h1>
      </div>

      <div className="container d-flex justify-content-start">
        <button className="btn btn-secondary" onClick={() => setCreateModal(true)}>
          Añadir Paquete
        </button>
      </div>

      <table className="table mt-2">
        <thead className="table-dark">
          <tr>
            <th>packageId</th>
            <th>senderName</th>
            <th>receiverName</th>
            <th>origin</th>
            <th>destination</th>
            <th>weight</th>
            <th>status</th>
            <th>estimatedDelivery</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, idx) => {
            return (
              <tr key={pkg.packageId}>
                <td>
                  {pkg.packageId}
                </td>
                <td>
                  {pkg.senderName}
                </td>
                <td>
                  {pkg.receiverName}
                </td>
                <td>
                  {pkg.origin}
                </td>
                <td>
                  {pkg.destination}
                </td>
                <td>
                  {pkg.weight}
                </td>
                <td>
                  {pkg.status}
                </td>
                <td>
                  {pkg.estimatedDelivery}
                </td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill pointer-hover"
                    viewBox="0 0 16 16"
                    onClick={() => deletePkg(idx, pkg)}
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
                    className="bi bi-pencil-square pointer-hover"
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
          <h2>{createModalIsOpen? 'Añadir nuevo paquete': `Editar Paquete: ${form.packageId}`}</h2>
        </ModalHeader>
        <ModalBody>
          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="packageId" className="col-form-label fw-bold">
                PackageId
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control-plaintext"
                readOnly
                id="packageId"
                value={createModalIsOpen? getNextId(): form.packageId}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="senderName" className="col-form-label fw-bold">
                Nombre del remitente
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="senderName"
                value={form.senderName}
                onChange={e =>
                  setForm(prev => ({ ...prev, senderName: e.target.value }))}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="receiverName" className="col-form-label fw-bold">
                Nombre del recibidor
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="receiverName"
                value={form.receiverName}
                onChange={e =>
                  setForm(prev => ({ ...prev, receiverName: e.target.value }))}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="origin" className="col-form-label fw-bold">
                Origen
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="origin"
                value={form.origin}
                onChange={e =>
                  setForm(prev => ({ ...prev, origin: e.target.value }))}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="destination" className="col-form-label fw-bold">
                Destino
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                id="destination"
                value={form.destination}
                onChange={e =>
                  setForm(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="weight" className="col-form-label fw-bold">
                Peso
              </label>
            </div>
            <div className="col-auto">
              <input
                type="number"
                className="form-control"
                id="weight"
                value={form.weight}
                onChange={e =>
                  setForm(prev => ({ ...prev, weight: e.target.value }))}
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="status" className="col-form-label fw-bold">
                Estado
              </label>
            </div>
            <div className="col-auto">
              <select
                className="form-select"
                value={form.status}
                id="status"
                onChange={e =>
                  setForm(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-auto">
              <label
                htmlFor="estimatedDelivery"
                className="col-form-label fw-bold"
              >
                Entrega estimada
              </label>
            </div>
            <div className="col-auto">
              <input
                type="date"
                class="form-control"
                id="estimatedDelivery"
                value={form.estimatedDelivery}
                onChange={e => setForm(prev => ({...prev, estimatedDelivery: e.target.value}))}
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
           <button className="btn btn-primary" onClick={edit} disabled={areFieldsDifferent() && !areFieldsEmpty()? true: false}>
           Editar
          </button>}
          <button className="btn btn-danger" onClick={cancel}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

    </div>
    </>
  );

}

export default Paquetes;