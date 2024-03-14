FROM rabbitmq:management
RUN rabbitmq-plugins enable --offline rabbitmq_web_stomp
