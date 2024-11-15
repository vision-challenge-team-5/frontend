'use client'

import Image from "next/image"
import AnalResult from './table'
import { useRef, useState, useEffect, ChangeEvent } from 'react'
import { useSolarPanelAnalysis } from "@/hook/useSolarPanelAnalysis"
import { Camera, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Monitor() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const { sendImage } = useSolarPanelAnalysis()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState('')


  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsCameraOpen(true)
    } catch (error) {
      console.error('Camera access denied:', error)
    }
  }

  useEffect(() => {
    if (videoRef.current && isCameraOpen) {
      openCamera()
    }
  }, [isCameraOpen])

  const openFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (reader.readyState === 2) {
        setImage(e.target?.result as string)
        sendImage({
          imageFile: file,
          confidence: "0.1",
          nmsThreshold: "0.7"
        })
      }
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-100">
              {isCameraOpen ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : image ? (
                <Image src={image} alt="Uploaded" layout="fill" objectFit="cover" />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">No media selected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline" onClick={openCamera}>
            <Camera className="mr-2 h-4 w-4" />
            Open Camera
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
            <input
              type="file"
              name="image_URL"
              accept="image/*, video/*"
              ref={fileRef}
              onChange={openFile}
              className="hidden"
            />
          </Button>
        </div>
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <AnalResult />
    </div>
  )
}