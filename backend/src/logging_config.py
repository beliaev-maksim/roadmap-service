import logging
import json
class JsonFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            'level': record.levelname,
            'message': record.getMessage(),
            'time': self.formatTime(record)
        })
# TODO: Use this formatter in FastAPI app
