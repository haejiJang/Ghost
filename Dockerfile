FROM ghost:4.3.3 as base

RUN apt update
RUN apt install -y  python3.7
RUN apt install -y python3-pip

COPY core/ /var/lib/ghost/versions/4.3.3/core/
COPY content/ /var/lib/ghost/versions/4.3.3/content/
COPY ghost.js /var/lib/ghost/versions/4.3.3/ghost.js
COPY index.js /var/lib/ghost/versions/4.3.3/index.js
