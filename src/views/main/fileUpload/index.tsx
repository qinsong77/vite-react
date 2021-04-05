// https://juejin.cn/post/6844904046436843527
import React, { useState, useRef } from "react"
import { Button }from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { uploadFile, uploadFileMerge } from '@api'

interface fileChunkObj {
    chunk: Blob,
    hash: string
}
const SIZE = 10 * 1024 * 1024 // 切片大小
export default function FileUpload() {
    const inputEl = useRef(null)
    function startHandleUploadFile() {
        if(inputEl.current.files && inputEl.current.files[0]) {
            const fileChunkList = createFileChunk(inputEl.current.files[0])
            const data: Array<fileChunkObj> = fileChunkList.map(({ file }, index) => ({
                chunk: file,
                hash: inputEl.current.files[0].name + '-' + index
            }))
            uploadChunks(data)
        }
    }
    function createFileChunk(file: Blob, size = SIZE) {
        const fileChunkList = []
        let curr = 0
        while (curr < file.size) {
            fileChunkList.push({
                file: file.slice(curr, curr + size)
            })
            curr += size
        }
        return fileChunkList
    }
    async function uploadChunks(dataList: Array<fileChunkObj>) {
        const requestList = dataList
            .map(({ chunk, hash }) => {
                const formData = new FormData()
                formData.append('chunk', chunk)
                formData.append('hash', hash)
                formData.append('filename', inputEl.current.files[0].name)
                return formData
            })
            .map((formData ) => {
                return uploadFile(formData)
            })
        const allRes = await Promise.all(requestList)
        console.log(allRes)
        const res = await uploadFileMerge({
            size: SIZE,
            filename: inputEl.current.files[0].name
        })
        console.log(res)
    }
    return (
        <div className='file-upload-container'>
            <input type='file' ref={inputEl}/>
            <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                icon={<CloudUploadOutlined />}
                onClick={startHandleUploadFile}>
                upload
            </Button>
        </div>
    )
}
