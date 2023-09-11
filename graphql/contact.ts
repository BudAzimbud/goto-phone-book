import { DocumentNode, gql } from "@apollo/client";

const GET_CONTACT: DocumentNode = gql`
    query GetContactList (
        $distinct_on: [contact_select_column!], 
        $limit: Int, 
        $offset: Int, 
        $order_by: [contact_order_by!], 
        $where: contact_bool_exp
    ) {
    contact(
        distinct_on: $distinct_on, 
        limit: $limit, 
        offset: $offset, 
        order_by: $order_by, 
        where: $where
    ){
        created_at
        first_name
        id
        last_name
        phones {
        number
        }
    }
    }
`
const GET_CONTACT_DETAIL = gql`
    query GetContactDetail($id: Int!){
    contact_by_pk(id: $id) {
        last_name
        id
        first_name
        created_at
        phones {
        number
        }
  }
}
`

const ADD_CONTACT_WITH_PHONES = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: {
          data: $phones
        }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

const DELETE_CONTACT = gql`
    mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
        first_name
        last_name
        id
    }
    }
`

const EDIT_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`


export {
  GET_CONTACT,
  GET_CONTACT_DETAIL,
  ADD_CONTACT_WITH_PHONES,
  DELETE_CONTACT,
  EDIT_CONTACT
}