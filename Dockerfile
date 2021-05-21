FROM ghost:4.5.0 as base

RUN apt update
RUN apt install -y  python3.7
RUN apt install -y python3-pip

COPY core/ /var/lib/ghost/versions/4.5.0/core/
COPY content/ /var/lib/ghost/versions/4.5.0/content/
COPY ghost.js /var/lib/ghost/versions/4.5.0/ghost.js
COPY index.js /var/lib/ghost/versions/4.5.0/index.js
