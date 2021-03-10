module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/results',
        permanent: true,
      },
    ]
  },
}
