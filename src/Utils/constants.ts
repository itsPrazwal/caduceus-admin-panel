import { UserOutlined } from '@ant-design/icons'
import { SideMenuProps } from './types'

const company_details = {
  title: 'Caduceus Pvt. Ltd.' ,
  name: 'Caduceus Nepal',
  logo: '',
}

const AdminSideBarItems: SideMenuProps[] = [
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: UserOutlined,
    key: '1',
    subMenu: []
  },
  {
    label: 'Ambulance',
    path: '/admin/ambulance',
    icon: UserOutlined,
    key: '2',
    subMenu: []
  },
  {
    label: 'Blood Bank',
    path: '/admin/blood-bank',
    icon: UserOutlined,
    key: '3',
    subMenu: []
  },
  {
    label: 'Disease',
    path: '/admin/disease',
    icon: UserOutlined,
    key: '4',
    subMenu: []
  },
  {
    label: 'Events',
    path: '/admin/events',
    icon: UserOutlined,
    key: '5',
    subMenu: []
  },
  {
    label: 'Hospital',
    path: '',
    icon: UserOutlined,
    key: '6',
    subMenu: [
      {
        label: 'Department',
        path: '/admin/hospital/department',
        icon: UserOutlined,
        key: '61',
      },
      {
        label: 'List',
        path: '/admin/hospital/list',
        icon: UserOutlined,
        key: '62',
      },
    ]
  },
  {
    label: 'Users',
    key: '7',
    path: '',
    icon: UserOutlined,
    subMenu: [
      {
        label: 'Blood Donor',
        path: '/admin/blood-donor',
        icon: UserOutlined,
        key: '71',
      },
      {
        label: 'Doctor',
        path: '/admin/doctor',
        icon: UserOutlined,
        key: '72',
      },
      {
        label: 'Patient',
        path: '/admin/patient',
        icon: UserOutlined,
        key: '73',
      },
    ]
  },
]

const genderOptions = [{
  label: 'Female',
  value: 'Female'
},{
  label: 'Male',
  value: 'Male'
},{
  label: 'Other',
  value: 'Other'
}]

const dataReFetchMaxDiff = 1000 * 60 * 2 /*Millisecond x Second x Minute*/

export {
  company_details,
  genderOptions,
  dataReFetchMaxDiff,
  AdminSideBarItems,
}
