'use client';
import React, { useState, useEffect } from "react";
 // Adjust the path as needed
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
import { useUser } from "@clerk/nextjs";
import { budgets } from '../../../database/schema';
import { Input } from "../../components/ui/input"; 
import BasicAlerts from '../../components/ui/alert';

function CreateBudget({ refreshData = () => {}, budgetItems = [] }) { // Added budgetItems as a prop
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { user } = useUser();

  useEffect(() => {
    let timer;
    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const onCreateBudget = async () => {
    try {
      const result = await db
        .insert(budgets)
        .values({
          name,
          amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: budgets.id });

      if (result) {
        refreshData();
        setAlertMessage("Budget created successfully!");
        setAlertSeverity("success");
      }
    } catch (error) {
      setAlertMessage("Failed to create budget.");
      setAlertSeverity("error");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-2xl items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
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
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input placeholder="e.g. Home Decor" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input type="number" placeholder="e.g. 5000$" onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button disabled={!(name && amount)} onClick={onCreateBudget} className="mt-5 w-full rounded-full">
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        <BasicAlerts message={alertMessage} severity={alertSeverity} />
      </Dialog>


    </div>
  );
}

export default CreateBudget;
