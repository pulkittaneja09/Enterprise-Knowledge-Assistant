/**
 * @typedef {Object} Source
 * @property {string} file
 * @property {number} page
 */

/**
 * @typedef {Object} QueryResponse
 * @property {string} question
 * @property {string} answer
 * @property {Source[]} sources
 */

/**
 * @typedef {Object} UploadResponse
 * @property {boolean} success
 * @property {string} filename
 * @property {number} pages
 * @property {number} chunks
 * @property {string} message
 */

/**
 * @typedef {Object} UploadedDocument
 * @property {string} id
 * @property {string} filename
 * @property {number} pages
 * @property {number} chunks
 * @property {string} uploadedAt
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {'user' | 'assistant'} role
 * @property {string} content
 * @property {Source[]} [sources]
 * @property {string} timestamp
 */

export {}
