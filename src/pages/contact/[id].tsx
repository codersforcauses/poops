
type contactData = {
  id: string
  first_name: string
  last_name: string
  pets: string
  email: string
  phone: string
  street_address: string
  region: string
  notes: string
}

type contactProp = {
  contact: contactData
}
const Contact = ({contact}: contactProp) => {
  return (
    <div>{contact.first_name}</div>
  )
}

export default Contact