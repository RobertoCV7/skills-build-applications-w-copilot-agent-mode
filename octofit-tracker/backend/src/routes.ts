import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

function createCollectionRouter(model: typeof User, notFoundName: string): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    const items = await model.find().lean();
    response.json(items);
  });

  router.get('/:id', async (request, response) => {
    const item = await model.findById(request.params.id).lean();

    if (!item) {
      response.status(404).json({ error: `${notFoundName} not found` });
      return;
    }

    response.json(item);
  });

  router.post('/', async (request, response) => {
    const item = await model.create(request.body);
    response.status(201).json(item);
  });

  return router;
}

export const usersRouter = createCollectionRouter(User, 'user');
export const teamsRouter = createCollectionRouter(Team, 'team');
export const activitiesRouter = createCollectionRouter(Activity, 'activity');
export const leaderboardRouter = createCollectionRouter(Leaderboard, 'leaderboard entry');
export const workoutsRouter = createCollectionRouter(Workout, 'workout');
