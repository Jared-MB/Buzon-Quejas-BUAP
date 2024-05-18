import { db, User, Complaint } from 'astro:db';
import { randomUUID } from 'node:crypto'
import * as bcrypt from 'bcryptjs'

import { loadEnv } from "vite";
const { SEED_NAME,
	SEED_LAST_NAME,
	SEED_MATRICULA,
	SEED_PHONE,
	SEED_EMAIL,
	SEED_PASSWORD,
	SEED_USERNAME } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/db/seed
export default async function seed() {

	const userId = randomUUID()
	const testUserId = randomUUID()
	const password = await bcrypt.hash(SEED_PASSWORD, 10)

	await db.insert(User).values([
		{
			id: userId,
			name: SEED_NAME,
			lastName: SEED_LAST_NAME,
			matricula: +SEED_MATRICULA,
			career: 'Ingeniería en Tecnologías de la Información',
			phone: SEED_PHONE,
			email: SEED_EMAIL,
			username: SEED_USERNAME,
			password,
			role: 'admin'
		},
		{
			id: testUserId,
			name: 'Usuario',
			lastName: 'de prueba',
			matricula: 2017091234,
			career: 'Ingeniería en Tecnologías de la Información',
			phone: '2222222222',
			email: 'test@alumno.buap.mx',
			username: 'prueba.usuario',
			password: await bcrypt.hash('password', 10),
		}
	])

	const complaintId = randomUUID()

	await db.insert(Complaint).values([
		{
			id: complaintId,
			userId,
			title: 'Queja de prueba',
			description: 'Esta es una queja de prueba',
			status: 'pending',
			at: new Date()
		},
		{
			id: randomUUID(),
			userId: testUserId,
			title: 'Queja de prueba',
			description: 'Esta es una queja de prueba',
			status: 'pending',
			at: new Date()
		}
	])

}
