import prisma from '@/src/app/prismadb';

export async function PUT(req, res) {
  const userId = req.query.id; // Assuming the ID is part of the URL path
  const newCredentials = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { USER_ID: userId },
      data: newCredentials,
    });

    res.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
