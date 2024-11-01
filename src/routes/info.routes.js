import { Router } from 'express';
import packageJsonInfo from '../../package.json' with { type: 'json' };

const router = Router();

router.get('/', (req, res) => {
  return res.json({
    version: packageJsonInfo.version,
    name: 'bov-control-api',
    documentation: `/docs`
  });
});

export default router;
