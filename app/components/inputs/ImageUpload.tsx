import React , {useCallback} from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhoto } from 'react-icons/tb'

declarge global {
    var cloudinary: any
}

interface ImageUploadProps {
    onChange: (value:string) => void,
    value: string
}


const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,value
}) => {
    const handleUpload = useCallback((result:any) => {
        onChange(result.info.secure_url)
    },[onChange])
    
  return <div>ImageUpload</div>
}

export default ImageUpload
