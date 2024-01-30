import React, { useState } from 'react';
import Modal from 'react-modal';

const DataTable = ({ data }) => {
    const [modalData, setModalData] = useState({
        variantID: '',
        architecture: '',
        minAndroidVer: '',
        dpi: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedRowIndex, setEditedRowIndex] = useState(null);

    // Function to handle edit action
    const handleEdit = (buttonId) => {
        console.log('Handling edit...');
        const rowNumber = parseInt(buttonId.split('_')[1]);
        const rowId = `row_${rowNumber}`;

        const rowElement = document.getElementById(rowId);

        if (rowElement) {
            const tds = rowElement.getElementsByTagName('td');

            if (tds.length >= 4) {
                const variantID = tds[0].innerText;
                const architecture = tds[1].innerText;
                const minAndroidVer = tds[2].innerText;
                const dpi = tds[3].innerText;

                setModalData({
                    variantID,
                    architecture,
                    minAndroidVer,
                    dpi,
                });

                setIsModalOpen(true);
                setEditedRowIndex(rowNumber - 1);
            } else {
                console.error(`Not enough td elements in row ${rowId}`);
            }
        } else {
            console.error(`Row element not found for row ${rowId}`);
        }
    };

    // Function to handle delete action
    const handleDelete = (e) => {
        const rowId = `row_${parseInt(e.currentTarget.id.split('_')[1])}`;
        console.log(`Delete variant in row ${rowId}`);

        // Remove the row from HTML
        const rowElement = document.getElementById(rowId);

        if (rowElement) {
            rowElement.remove();
        }

        // Close the modal
        handleModalClose();
    };


    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditedRowIndex(null);
    };

    const handleInputChange = (e, field) => {
        setModalData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const handleApply = () => {
        if (editedRowIndex !== null) {
            const rowId = `row_${editedRowIndex + 1}`;
            const rowElement = document.getElementById(rowId);

            if (rowElement) {
                const tds = rowElement.getElementsByTagName('td');
                tds[0].innerText = modalData.variantID;
                tds[1].innerText = modalData.architecture;
                tds[2].innerText = modalData.minAndroidVer;
                tds[3].innerText = modalData.dpi;
            }
        }

        handleModalClose();
    };

    let row_number = 0;

    return (
        <div>
            <table className="data-table" style={{ paddingBottom: '200px', marginBottom: '200px' }}>
                <thead>
                    <tr>
                        <th>Variant ID</th>
                        <th>Architecture</th>
                        <th>Min. Android Ver.</th>
                        <th>DPI</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        Object.keys(item).map((childKey) => {
                            row_number += 1;
                            return (
                                <tr key={`${index}-${childKey}`} id={`row_${row_number}`}>
                                    <td>{item[childKey][0]}</td>
                                    <td>{item[childKey][3]}</td>
                                    <td>{item[childKey][4]}</td>
                                    <td>{item[childKey][5]}</td>
                                    <td>
                                        <div className="button-group">
                                            <button className="apply-btn edit-btn" id={`edit_${row_number}`} onClick={(e) => handleEdit(e.currentTarget.id)}>
                                                {`Edit`}
                                            </button>
                                            <button className="cancel-btn delete-btn" id={`delete_${row_number}`} onClick={(e) => handleDelete(e)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        border: 'none',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        height: '300px',
                        margin: 'auto',
                        padding: '20px',
                        background: 'white',
                    },
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Data</h2>
                <div className="modal-content">
                    <div className="input-group">
                        <label>Variant ID:</label>
                        <input type="text" value={modalData.variantID} onChange={(e) => handleInputChange(e, 'variantID')} />
                    </div>
                    <div className="input-group">
                        <label>Architecture:</label>
                        <input type="text" value={modalData.architecture} onChange={(e) => handleInputChange(e, 'architecture')} />
                    </div>
                    <div className="input-group">
                        <label>Min. Android Ver.:</label>
                        <input type="text" value={modalData.minAndroidVer} onChange={(e) => handleInputChange(e, 'minAndroidVer')} />
                    </div>
                    <div className="input-group">
                        <label>DPI:</label>
                        <input type="text" value={modalData.dpi} onChange={(e) => handleInputChange(e, 'dpi')} />
                    </div>
                    <div className="button-group">
                        <button className="apply-btn" onClick={handleApply}>
                            Apply
                        </button>
                        <button className="cancel-btn" onClick={handleModalClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DataTable;
