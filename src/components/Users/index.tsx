import { useEffect, useState } from 'react'
import { Button, Modal, Table, Typography } from 'antd'
import AxiosController from '../../utils/axios.controller'
import { PlusOutlined } from '@ant-design/icons'
import useMsgApi from '../../hooks/useMsgApi'
import { getColumns } from './controller'
import { AxiosError } from 'axios'
import CustomForm from '../Form'
import './style.css'

interface UsersProps {}

const axios = new AxiosController()

// eslint-disable-next-line no-empty-pattern
const Users = ({}: UsersProps) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [shouldGetUsers, setShouldGetUsers] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false)
  // const [Scroll, setScroll] = useState({})
  const [formProp, setFormProp] = useState<FormPropType>({
    shouldSubmit: false,
    message: null,
    status: 'initial',
    setFormProp: undefined,
    enable: true,
  })
  const msgApi = useMsgApi()
  const columns = getColumns()

  const handleOk = () => {
    setFormProp({ ...formProp, shouldSubmit: true, setFormProp })
  }

  const [scroll, setScroll] = useState({})
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 600) {
          setScroll({
            x: '100dvw'
          })
        } else {
          setScroll({})
        }
      }
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])



  useEffect(() => {
    if (!shouldGetUsers) return

    axios.getUsers().then((response) => {
      if (response instanceof AxiosError) return console.error(response.message)
      setData(response.data.data as UserData[])
      setShouldGetUsers(false)
      setIsLoading(false)
    })
  }, [shouldGetUsers])

  useEffect(() => {
    if (formProp.shouldSubmit) return

    // console.log('formProp', formProp)

    if (formProp.status === 'ok') {
      msgApi.success('Usuario creado con éxito.')
      setOpen(false)
      setShouldGetUsers(true)
      setConfirmLoading(false)
      setFormProp({ ...formProp, status: 'initial', message: null })
    } else if (formProp.status === 'form-error') {
      msgApi.warning(formProp.message)
      setFormProp({ ...formProp, status: 'initial', message: null })
    } else if (formProp.status === 'server-error') {
      msgApi.error(formProp.message)
      setConfirmLoading(false)
      setFormProp({ ...formProp, status: 'initial', message: null })
    } else if (formProp.status === 'loading') {
      setConfirmLoading(true)
    }
  }, [formProp, msgApi])

  return (
    <>
      <Typography.Title>Lista de usuarios</Typography.Title>
      <Button
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        size="large"
        onClick={() => setOpen(true)}
      />
      <Modal
        title="Registro de usuario"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <CustomForm.User formProp={formProp} />
      </Modal>
      <Table
        bordered
        scroll={scroll}
        loading={isLoading}
        columns={columns}
        rowKey={(user) => user._id}
        dataSource={data}
        className="table-users"
      />
    </>
  )
}

export default Users
