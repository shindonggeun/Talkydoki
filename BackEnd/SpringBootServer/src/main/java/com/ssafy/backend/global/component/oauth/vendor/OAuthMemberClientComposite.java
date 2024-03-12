package com.ssafy.backend.global.component.oauth.vendor;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.oauth.exception.OAuthErrorCode;
import com.ssafy.backend.global.component.oauth.exception.OAuthException;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

@Primary
@Component
public class OAuthMemberClientComposite implements OAuthMemberClient {
    private final Map<OAuthDomain, OAuthMemberClient> clientMap;

    public OAuthMemberClientComposite(Set<OAuthMemberClient> clients) {
        this.clientMap = clients.stream()
                .collect(
                        toMap(OAuthMemberClient::getOAuthDomain, identity()));
    }

    @Override
    public OAuthDomain getOAuthDomain() {
        return null;
    }

    @Override
    public Member fetch(OAuthDomain oAuthDomain, String authCode) {
        return getClient(oAuthDomain).fetch(oAuthDomain, authCode);
    }

    private OAuthMemberClient getClient(OAuthDomain oAuthDomain) {
        return Optional.ofNullable(clientMap.get(oAuthDomain))
                .orElseThrow(() -> new OAuthException(OAuthErrorCode.NOT_SUPPORT_VENDOR));
    }
}
