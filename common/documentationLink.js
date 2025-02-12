import app from '/src/setup/app.js'

export const documentationLink = (path, token) => {
    const baseUrl = app.kbBaseUrl
    
    return (`
      <a 
      href='${baseUrl}${path}?token=${token}'
      target='_blank'
      class='tw-text-blue-500'>
        Learn more
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    `)
}