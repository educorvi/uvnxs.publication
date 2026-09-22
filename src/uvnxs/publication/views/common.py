from plone import api

import jats_importexport_client

class TimeoutApiClient(jats_importexport_client.ApiClient):
    def call_api(
        self,
        method,
        url,
        header_params=None,
        body=None,
        post_params=None,
        _request_timeout=None,
    ):
        if _request_timeout is None:
            _request_timeout = (3.0, 15.0)  # connect, read seconds

        return super().call_api(
            method,
            url,
            header_params=header_params,
            body=body,
            post_params=post_params,
            _request_timeout=_request_timeout,
        )

def get_api_client() -> jats_importexport_client.ApiClient:
    base_url = api.portal.get_registry_record("uvnxs.publication.base_url")
    if api.portal.get_registry_record("uvnxs.publication.use_api_key"):
        api_key = api.portal.get_registry_record("uvnxs.publication.api_key")
        configuration = jats_importexport_client.Configuration(host=base_url)
        configuration.api_key["APIKeyHeader"] = api_key
    else:
        configuration = jats_importexport_client.Configuration(host=base_url)
    return TimeoutApiClient(configuration=configuration)
