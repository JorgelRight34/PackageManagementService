import {useState, useEffect} from 'react';

function Create({isCreate, IsEdit, nPackages}){

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

    const getNextId = () => {
        return (
          "PKG" + "0".repeat(4 - nPackages.toString().length) + (nPackages + 1)
        );
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
    
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>
          <h2>Añadir nuevo paquete</h2>
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
                value={getNextId()}
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
            <button className="btn btn-primary" onClick={insert} disabled={areFieldsEmpty()}>
              Insertar
            </button>
          <button className="btn btn-danger" onClick={cancel}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    )
}