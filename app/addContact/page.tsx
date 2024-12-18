'use client';

import Image from "next/image";
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';

// Function to add data to Firestore
async function addDataToFirestore(
    userName: string,
    mobileNumber: string,
    walletAddress: string,
    addPin: string
): Promise<boolean> {
    try {
        const docRef = await addDoc(collection(db, "message"), {
            userName: userName,
            mobileNumber: mobileNumber,
            walletAddress: walletAddress,
            addPin: addPin, 
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.error("Error adding document: ", error);
        return false;
    }
}

export default function AddContact() {
    const [userName, setUserName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [addpin, setAddPin] = useState<string>("");

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const added = await addDataToFirestore(userName, mobileNumber, walletAddress, addpin);
        if (added) {
            setUserName("");
            setMobileNumber("");
            setWalletAddress("");
            setAddPin("");
            alert("Data added to contact list successfully");
        }
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numbers and limit to 4 digits
        if (/^\d{0,4}$/.test(value)) {
            setAddPin(value);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Add Contact</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg space-y-4">
                <input
                    type="text"
                    id="userName"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
                <input
                    type="text"
                    id="mobileNumber"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                    required
                />
                <input
                    type="text"
                    id="walletAddress"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your wallet address"
                    required
                />
                <input
                    type="number"
                    id="addpin"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={addpin}
                    onChange={handlePinChange}
                    placeholder="Enter your pin"
                    required
                />
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
