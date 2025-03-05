const express = require('express');
const { createEvent, getAllEvents, getEventById, deleteEventById, updateEventById } = require('../Controllers/EventController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');

const routes = express.Router();

routes.get('/', getAllEvents);

routes.post('/', cloudinaryFileUploader.single('profileImage'), createEvent);

routes.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEventById); 

routes.get('/:id', getEventById);

routes.delete('/:id', deleteEventById);

module.exports = routes;
