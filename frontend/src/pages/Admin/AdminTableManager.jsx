// frontend/src/pages/Admin/AdminTableManager.jsx
import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import AdminLayout from '../../components/Admin/AdminLayout';

const AdminTableManager = () => {
    const [tables, setTables] = useState([]);
    const [newTableNumber, setNewTableNumber] = useState('');
    const [error, setError] = useState(null);

    // Fetch Tables
    const fetchTables = async () => {
        try {
            const { data } = await API.get('/tables');
            setTables(data);
        } catch (err) {
            setError('Failed to fetch tables.');
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    // Handle Table Creation
    const handleCreateTable = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await API.post('/tables', { number: parseInt(newTableNumber) });
            alert('Table created successfully!');
            setNewTableNumber('');
            fetchTables();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create table.');
        }
    };

    // Handle QR Code Generation & Download
    const handleGenerateQR = async (tableId, tableNumber) => {
        try {
            const { data } = await API.get(`/tables/${tableId}/qr`);
            
            // Backend se aayi hui data URL (QR code image string) ko use karna
            const qrDataUrl = data.qrCodeUrl;
            
            // User ko download ka option dena (creating a temporary link)
            const link = document.createElement('a');
            link.href = qrDataUrl;
            link.download = `QR_Table_${tableNumber}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            alert(`QR Code for Table ${tableNumber} downloaded successfully!`);
        } catch (err) {
            setError('Failed to generate QR code.');
        }
    };

    return (
        <AdminLayout current="tables">
            <h2>Table Manager (Admin)</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', maxWidth: '400px' }}>
                <h3>Create New Table</h3>
                <form onSubmit={handleCreateTable}>
                    <input type="number" placeholder="Table Number" value={newTableNumber} onChange={(e) => setNewTableNumber(e.target.value)} required min="1" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
                    <button type="submit">Create Table</button>
                </form>
            </div>

            <h3>Tables List ({tables.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {tables.map(table => (
                    <div key={table._id} style={{ border: '2px solid #343a40', padding: '15px', borderRadius: '8px' }}>
                        <h4>Table {table.number}</h4>
                        <p>QR Slug: <code>{table.qrSlug}</code></p>
                        <button 
                            onClick={() => handleGenerateQR(table._id, table.number)}
                            style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}
                        >
                            ⬇️ Download QR Code
                        </button>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default AdminTableManager;