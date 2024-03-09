import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailAPI = async (baordId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${baordId}`)
  return response.data
}

export const updateBoardDetailAPI = async (baordId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${baordId}`, updateData)
  return response.data
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
