'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface ContactData {
    userName: string;
    mobileNumber: string;
    walletAddress: string;
}

export default function EditContact() {
    const router = useRouter();
    const { id } = useParams();
    const [contact, setContact] = useState<ContactData>({
        userName: '',
        mobileNumber: '',
        walletAddress: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const docRef = doc(db, 'message', id as string);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContact(docSnap.data() as ContactData);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching contact: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchContact();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'message', id as string);
            await updateDoc(docRef, { ...contact } as Partial<ContactData>);
            alert('Contact updated successfully!');
            router.push('/contacts');
        } catch (error) {
            console.error('Error updating contact: ', error);
        }
    };


    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
            <div className="space-y-4">
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={contact.userName}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={contact.mobileNumber}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label>Wallet Address:</label>
                    <input
                        type="text"
                        name="walletAddress"
                        value={contact.walletAddress}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => router.push('/contacts')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
