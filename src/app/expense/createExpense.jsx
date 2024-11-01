"use client"
import React, { useEffect } from 'react'
import db from "../../../database/dbconfig"
import { budgets, expenses } from '../../../database/schema'
import { useState } from 'react'
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
import { Input } from "../../components/ui/input";
import BasicAlerts from '../../components/ui/alert';


const CreateExpense = ({addExpense = () => {} }) => {
     // Set States
     const [name, setName] = useState('')
     const [amount, setAmount] = useState('')
     const [emojiIcon, setEmojiIcon] = useState('😀')
     const [openEmojiPicker, setOpenEmojiPicker] = useState()
     const [alertMessage, setAlertMessage] = useState('')
     const [alertSeverity, setAlertSeverity] = useState('success')

    useEffect(() => {
    let timer;
    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }
    return () => clearTimeout(timer);
  }, [alertMessage]);
     // get data from the database
     const onCreateExpense = async() => {
        try {
            const date = new Date();
            const result = await db
            .insert(expenses)
            .values({
                name: name,
                amount: amount,
                Icon: emojiIcon,
                createdAt: {
                    date: date.toLocaleDateString('en-US',{
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
            })}
            })
            .returning({ insertedId: budgets.id})
            setName('')
            setAmount('')
            if(result){
                addExpense()
                setAlertMessage("Expenses Created")
                setAlertSeverity("Success")
            }
          // If data is not fetch console.log out failing messages
        }catch(error){
            setAlertMessage("Failed to created expenses")
            setAlertSeverity("Failed")

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
        <h2>Create New Expense</h2>
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Expense</DialogTitle>
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
              <h2 className="text-black font-medium my-1">Expense Name</h2>
              <Input
                placeholder="e.g. Home Decor"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Expense Amount</h2>
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
            onClick={onCreateExpense}
            className="mt-5 w-full rounded-full"
          >
            Create Expense
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
    <BasicAlerts message={alertMessage} severity={alertSeverity} />
  </Dialog>
</div>
  )
}

export default CreateExpense