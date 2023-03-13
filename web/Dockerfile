FROM node:16-alpine AS  builder

WORKDIR /source
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
COPY . .
RUN yarn build

FROM nginx

COPY --from=builder /source/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
