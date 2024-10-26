"use client"
import React, { useState } from 'react'
import {incomes} from "../../../database/schema"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../components/ui/button";
import db from "../../../database/dbconfig";
import { Input } from "../../components/ui/input";
import BasicAlerts from '../../components/ui/alert'; // Adjust the import path
import { useEffect } from "react";
import { useUser } from '@clerk/nextjs';

const createIncome = ({addIncome = () => {} }) => {
    const [emojiIcon, setEmojiIcon] = useState('😀')
    const [openEmojiPicker, setOpenEmojiPicker] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const {user} = useUser()
    useEffect(() => {
        let timer;
        if (alertMessage){
            timer = setTimeout(() => {
                setAlertMessage('')
            },3000)
        } return () => clearTimeout(timer)
    }, [alertMessage]);

   const onCreateIncome = async() => {
    try{
        const result = await db
        .insert(incomes)
        .values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            Icon: emojiIcon,   
        }).returning({insertedId: incomes.id})
        setAmount('')
        setName('')
        if(result){
            addIncome()
            setAlertMessage("Income created successfully!")
            setAlertSeverity("Success")
        }
    }catch(error){
        setAlertMessage("Failed to create income")
        setAlertSeverity("Failed!")
        console.log(error)
    }
    
   }
   return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Income</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Income</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-20">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Income Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Income Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onCreateIncome}
                className="mt-5 w-full rounded-full"
              >
                Create Income
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        <BasicAlerts message={alertMessage} severity={alertSeverity} />
      </Dialog>
    </div>
  );
  
}

export default createIncome