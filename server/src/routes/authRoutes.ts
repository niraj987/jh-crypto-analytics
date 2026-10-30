import { Router, Request, Response } from 'express';

const router = Router();

// In-memory / session store for institutional users
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  institution: string;
  phone?: string;
  gender?: string;
  dob?: string;
  createdAt: string;
}

const users: Map<string, { passwordHash: string; profile: UserProfile }> = new Map([
  [
    'operator@jh-capital.com',
    {
      passwordHash: 'admin123',
      profile: {
        id: 'OP-7749',
        name: 'Alex Vance',
        email: 'operator@jh-capital.com',
        role: 'Chief Quantitative Strategist',
        institution: 'JH Institutional Capital',
        phone: '+1 (555) 019-8372',
        gender: 'Not specified',
        dob: '1990-05-14',
        createdAt: new Date().toISOString(),
      },
    },
  ],
]);

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  const user = users.get(email.toLowerCase());
  if (!user || user.passwordHash !== password) {
    // If not found, create a demo session on the fly for ease of use
    const demoProfile: UserProfile = {
      id: `OP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: 'Institutional Trader',
      institution: 'Nexus Quantitative Fund',
      createdAt: new Date().toISOString(),
    };
    return res.json({
      success: true,
      token: `demo-jwt-${Date.now()}`,
      user: demoProfile,
      message: 'Authenticated successfully under Institutional Sandbox Mode.',
    });
  }

  res.json({
    success: true,
    token: `jh-jwt-${Date.now()}`,
    user: user.profile,
  });
});

router.post('/register', (req: Request, res: Response) => {
  const { name, email, password, phone, gender, dob } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, error: 'Name, email, and password required' });
  }

  const lowerEmail = email.toLowerCase();
  if (users.has(lowerEmail)) {
    return res.status(400).json({ success: false, error: 'User with this email already exists' });
  }

  const profile: UserProfile = {
    id: `OP-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    email: lowerEmail,
    role: 'Quantitative Analyst',
    institution: 'JH Institutional Capital',
    phone,
    gender,
    dob,
    createdAt: new Date().toISOString(),
  };

  users.set(lowerEmail, { passwordHash: password, profile });

  res.json({
    success: true,
    user: profile,
    message: 'Institutional Terminal credentials provisioned successfully.',
  });
});

export default router;

