import axios from 'axios'
import routes from '@/api/routes'

export const state = () => ({
  clients: [],
  supplyPoints: []
})

export const mutations = {
  SET_CLIENTS (state, clients) {
    state.clients = clients
  },

  SET_SUPPLY_POINTS (state, supplyPoints) {
    state.supplyPoints = supplyPoints
  }
}

export const getters = {
  getClientByCups: state => (cups) => {
    return state.clients.find(client => client.cups === cups) ?? null
  },

  getSupplyPointByCups: state => (cups) => {
    return state.supplyPoints.find(supplyPoint => supplyPoint.cups === cups) ?? null
  }
}

export const actions = {
  async fetchClients ({ commit }) {
    const response = await axios.get(routes.API_CLIENTS)
    const clients = response.data
    commit('SET_CLIENTS', clients)
  },

  async fetchSupplyPoints ({ commit }) {
    const response = await axios.get(routes.API_SUPPLY_POINTS)
    const supplyPoints = response.data
    commit('SET_SUPPLY_POINTS', supplyPoints)
  }
}
