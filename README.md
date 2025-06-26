# Military-Asset-Management-System
It is an kristalball - Full Stack Engineer Assignment
| Action         | Endpoint                      | Role required         |
| -------------- | ----------------------------- | --------------------- |
| Create asset   | `POST /api/assets`            | Admin / Commander     |
| List assets    | `GET /api/assets`             | Any logged‑in         |
| Purchase stock | `POST /api/purchases`         | Commander / Logistics |
| Transfer stock | `POST /api/transfers`         | Commander             |
| Assign asset   | `POST /api/assignments`       | Commander / Logistics |
| Mark expended  | `PUT /api/assignments/expend` | Commander / Logistics |
