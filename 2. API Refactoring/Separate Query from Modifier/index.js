import express from 'express';

import { getUsersRoute } from './routes/index.js';

const application = express();

application.use('/api/v1', getUsersRoute);

application.listen(process.env.PORT || 8000, () => {
    console.log ( `Application listening on port ${process.env.PORT || 8000}` );
});