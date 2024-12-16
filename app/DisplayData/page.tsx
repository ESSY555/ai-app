'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface MessageData {
    id: string;
    userName: string;
    mobileNumber: string;
    walletAddress: string;
}

export default function DisplayData() {
    const [messages, setMessages] = useState<MessageData[]>([]);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'message'));
            const data: MessageData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<MessageData, 'id'>),
            }));
            setMessages(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'message', id));
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id)); // Update state
            alert('Contact deleted successfully');
        } catch (error) {
            console.error('Error deleting contact: ', error);
        }
    };

    const handleSend = (message: MessageData) => {
        alert(`Sending message to ${message.walletAddress}`);
        // alert(`Sending message to ${message.userName} at ${message.mobileNumber}`);

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-8 font-sans">
            <h1 className="text-2xl font-bold mb-4">Saved Contacts</h1>
            {messages.length === 0 ? (
                <p>No data found!</p>
            ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 text-left">Name</th>
                                    <th className="border p-2 text-left">Mobile Number</th>
                                    <th className="border p-2 text-left">Wallet Address</th>
                                    <th className="border p-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr key={message.id} className="hover:bg-gray-100">
                                        <td className="border p-2">{message.userName}</td>
                                        <td className="border p-2">{message.mobileNumber}</td>
                                        <td className="border p-2">{message.walletAddress}</td>
                                        <td className="border p-2 flex gap-2">
                                            <button
                                                onClick={() => handleDelete(message.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleSend(message)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Send
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            )}
        </div>
    );
}
