import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 2050,
                mode: 33204,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 7735800,
                size: 65024,
                blocks: 128,
                atimeMs: 1631380361416.642,
                mtimeMs: 1631380324011.464,
                ctimeMs: 1631380361416.6423,
                birthtimeMs: 1631380361416.6423,
                atime: '2021-09-11T17:12:41.417Z',
                mtime: '2021-09-11T17:12:04.011Z',
                ctime: '2021-09-11T17:12:41.417Z',
                birthtime: '2021-09-11T17:12:41.417Z'
              }

            const mockUser = 'tunnes'
            process.env.USER = mockUser
            const filename = 'file.jpg'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])
            
            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)
            
            const result = await FileHelper.getFilesStatus("/tmp")



            const expectedResult = [
              {
                    size: "65 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})