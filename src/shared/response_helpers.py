from flask import Response, json, make_response


def get_response(status_code, res=None):
    if res is None:
        return make_response('', status_code)

    return Response(
        mimetype='application/json',
        response=json.dumps(res),
        status=status_code
    )
