'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen p-8 font-sans">
            <h1 className="text-2xl font-bold mb-4">Saved Contacts</h1>
            {messages.length === 0 ? (
                <p>No data found!</p>
            ) : (
                <div className="grid gap-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className="p-4 border rounded-lg shadow-lg bg-white"
                        >
                            <p>
                                <strong>Name:</strong> {message.userName}
                            </p>
                            <p>
                                <strong>Mobile Number:</strong> {message.mobileNumber}
                            </p>
                            <p>
                                <strong>Wallet Address:</strong> {message.walletAddress}
                            </p>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
