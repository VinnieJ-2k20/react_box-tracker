const BASE_URL = 'http://demo1030918.mockable.io/'

export function getModes() {
  return fetch(`${BASE_URL}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load modes');
      }

      return response.json();
    })
}
