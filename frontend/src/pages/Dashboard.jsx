import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API Call to fetch wallets
        const fetchWallets = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/wallets/1');
                setWallets(response.data);
            } catch (error) {
                console.error("Error fetching wallets", error);
                // Fallback or empty
            } finally {
                setLoading(false);
            }
        };
        fetchWallets();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">FingerPay Dashboard</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {wallets.map((wallet) => (
                        <div key={wallet.id} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 hover:shadow-xl transition">
                            <h2 className="text-xl font-semibold text-gray-700">{wallet.name}</h2>
                            <p className="text-4xl font-bold text-gray-900 mt-4">${wallet.balance.toFixed(2)}</p>
                            <div className="mt-4 text-sm text-gray-500">Linked to biometric ID</div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Finger Configuration</h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    {/* Visual Representation of Hand Mapping */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-24 bg-blue-100 border-2 border-blue-500 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl font-bold text-blue-600">1</span>
                        </div>
                        <p className="font-semibold">Index Finger</p>
                        <p className="text-sm text-gray-500">Personal (Coffee/Lunch)</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-28 bg-green-100 border-2 border-green-500 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl font-bold text-green-600">2</span>
                        </div>
                        <p className="font-semibold">Middle Finger</p>
                        <p className="text-sm text-gray-500">Family (Groceries)</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-16 h-24 bg-purple-100 border-2 border-purple-500 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-2xl font-bold text-purple-600">3</span>
                        </div>
                        <p className="font-semibold">Ring Finger</p>
                        <p className="text-sm text-gray-500">Company (Expenses)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
