"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { RoomType } from "@/config/types";
import Loader from "@/components/loader";
import { BorderBeam } from "@/components/magicui/border-beam";
import { toast, Toaster } from "sonner";
import { useMusicContext } from "@/context/provider/musiccontext";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface DataType {
    name : string,
    description : string
}

export default function Rooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [data, setData] = useState<DataType>({
    name : '',
    description : ''
  })
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState("");
  const { tracks } = useMusicContext()

  const router = useRouter()
  const token = localStorage.getItem("token")

  const handleClick = async () => {
    console.log(data)
    if(!data.name.trim() || !data.description.trim()){
        console.log("here")
        toast.error("All Fields Are Required")
        return
    }

    setDataLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/createRoom`, {
                name : data.name,
                description : data.description,
                //@ts-ignore
                songId : tracks[0]!.id
            }, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })

            const roomId : string = response.data.roomId
            router.push(`/rooms/${roomId}`)
            setDataLoading(false)
        } catch (error) {
            console.log(error)
            setDataLoading(false)

        }
  }

  console.log("data is ", data)

  const getRooms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/rooms`);

      const data = response.data;

      setRooms(data.rooms);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //@ts-ignore
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    getRooms();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div
      style={{
        maskImage: `linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 1) 100%
            )`,
      }}
      className="bg-gradient-to-br from-blue-300/90 via-white to-rose-300 h-full w-full pb-20"
    >
      <div className="max-w-4xl mx-auto h-screen flex flex-col items-center gap-10">

        <Toaster />
        <div className="bg-card p-10 border border-border w-[60%] rounded-[10px]">
          <div className="flex flex-col items-center w-full gap-10">
            <h1 className="text-4xl font-poppins font-bold">Create Room</h1>
            <div className="w-full flex flex-col gap-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Name" onChange={(e) => setData(prev => ({...prev, name : e.target.value}))} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label>Description</Label>
              <textarea  placeholder="Description" className="p-2 border border-border rounded-[10px]" onChange={(e) => setData(prev => ({...prev, description : e.target.value}))} />
            </div>
            <div className="w-full flex flex-col gap-2 relative">
              <Button variant={"outline"} onClick={handleClick}>
                <span>Create</span>
                <BorderBeam
                  duration={6}
                  size={200}
                  className="from-transparent via-red-500 to-transparent"
                />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-poppins font-bold mb-4">Rooms</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {rooms.length > 0 &&
              rooms.map((room, index) => (
                <Link href={`/rooms/${room.id}`} key={index}>
                <div
                  className="bg-card w-60 border border-border p-4 rounded-[10px] shadow-sm cursor-pointer"
                  key={index}
                >
                  <h2>Name : {room.name}</h2>
                  <p>Description : {room.description}</p>
                  <div>Song Playing : {room.songId}</div>
                </div>
                </Link>
              ))}

            {rooms.length === 0 && (
              <div className="w-full bg-white">No Room Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
