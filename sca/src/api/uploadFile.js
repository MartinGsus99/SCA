/*
 * @Author: Aruver
 * @Date: 2022-08-19 16:45:26
 * @LastEditors: Aruver
 * @qq: 37919926
 */
import request from '@/utils/request.js'


export function uploadFile(data, uploader) {
    return request({
        url: '/sys/upload',
        method: 'post',
        data,
        onUploadProgress: progressEvent => {
            let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
            uploader.onProgress({
                percent: percent
            }); //调用uploader的进度回调
        }
    })
}
