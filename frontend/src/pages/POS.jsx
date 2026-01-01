import React, { useEffect, useState } from 'react';
import axios from 'axios';

const POS = () => {
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('Ready to Scan...');
    const [statusType, setStatusType] = useState('info'); // info, success, error
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if (processing) return;

            const keyMap = {
                '1': 'INDEX',
                '2': 'MIDDLE',
                '3': 'RING'
            };

            const fingerType = keyMap[e.key];

            if (fingerType) {
                if (!amount || parseFloat(amount) <= 0) {
                    setStatus('Please enter a valid amount');
                    setStatusType('error');
                    return;
                }

                processPayment(fingerType);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [amount, processing]);

    const processPayment = async (fingerType) => {
        setProcessing(true);
        setStatus(`Scanning ${fingerType} finger...`);
        setStatusType('info');

        try {
            const response = await axios.post('http://localhost:8081/api/pay', {
                userId: 1,
                fingerType: fingerType,
                amount: parseFloat(amount)
            });

            if (response.data.status === 'SUCCESS') {
                setStatus(`Paid via ${response.data.walletName}! Remaining: $${response.data.remainingBalance.toFixed(2)}`);
                setStatusType('success');
            } else {
                setStatus(`Payment Failed: ${response.data.message}`);
                setStatusType('error');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setStatus(`Error: ${error.response.data.message || 'Transaction Failed'}`);
            } else {
                setStatus('Error connecting to server');
            }
            setStatusType('error');
        } finally {
            setProcessing(false);
        }
    };

    const getStatusColor = () => {
        switch (statusType) {
            case 'success': return 'bg-green-100 text-green-800 border-green-500';
            case 'error': return 'bg-red-100 text-red-800 border-red-500';
            default: return 'bg-gray-100 text-gray-800 border-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center uppercase tracking-wider">FingerPay POS</h1>

                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2">AMOUNT ($)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 text-3xl font-mono leading-tight focus:outline-none focus:shadow-outline text-right"
                        placeholder="0.00"
                        autoFocus
                    />
                </div>

                <div className={`p-8 rounded-xl border-l-8 text-center transition-all duration-300 ${getStatusColor()}`}>
                    <h2 className="text-3xl font-bold">{status}</h2>
                    {statusType === 'info' && <p className="mt-2 text-sm text-gray-600 animate-pulse">Waiting for biometric scan...</p>}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center text-gray-400 text-sm">
                    <div>
                        <span className="block font-bold text-gray-500 text-lg">[1]</span>
                        INDEX / Personal
                    </div>
                    <div>
                        <span className="block font-bold text-gray-500 text-lg">[2]</span>
                        MIDDLE / Family
                    </div>
                    <div>
                        <span className="block font-bold text-gray-500 text-lg">[3]</span>
                        RING / Company
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POS;
