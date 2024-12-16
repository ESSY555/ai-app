'use client';
import Image from "next/image";
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';

async function addDataToFirestore(
    userName: string,
    mobileNumber: string,
    walletAddress: string,
): Promise<boolean> {
    try {
        const docRef = await addDoc(collection(db, "message"), {
            userName: userName,
            mobileNumber: mobileNumber,
            walletAddress: walletAddress,
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (error) {
        console.log("Error adding document ", error);
        return false;
    }
}

export default function addContact() {
    const [userName, setUserName] = useState<string>("");
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [walletAddress, setWalletAddress] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const added = await addDataToFirestore(userName, mobileNumber, walletAddress);
        if (added) {
            setUserName("");
            setMobileNumber("");
            setWalletAddress("");
            alert("Data added to contact list successfully");
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Add Contact</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg">
                <input
                    type="text"
                    id="userName"
                    className="w-full py-2 border rounded-lg focus:outline-none focus:border"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                />
                <input
                    type="text"
                    id="mobileNumber"
                    className="w-full py-2 border rounded-lg focus:outline-none focus:border"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                />
                <input
                    type="text"
                    id="walletAddress"
                    className="w-full py-2 border rounded-lg focus:outline-none focus:border"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter your wallet address"
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
