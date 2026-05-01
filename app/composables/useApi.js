export const useApi = () => {
  const authStore = useAuthStore()
  
  const getAuthHeaders = () => {
    // Always get fresh token from store or storage
    let token = authStore.token
    
    if (!token) {
      token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      if (token) {
        authStore.token = token
      }
    }
    
    return {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  
  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...getAuthHeaders(),
      ...options.headers
    }
    
    return $fetch(url, {
      ...options,
      headers
    })
  }
  
  return {
    getAuthHeaders,
    fetchWithAuth
  }
}