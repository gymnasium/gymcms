FROM jekyll/jekyll
# Configure Git
RUN git config --system --add safe.directory /srv/jekyll && \
    git config --system --add core.quotepath false
