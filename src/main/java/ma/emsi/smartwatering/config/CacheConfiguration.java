package ma.emsi.smartwatering.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, ma.emsi.smartwatering.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, ma.emsi.smartwatering.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, ma.emsi.smartwatering.domain.User.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Authority.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.User.class.getName() + ".authorities");
            createCache(cm, ma.emsi.smartwatering.domain.ExtraUser.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.ExtraUser.class.getName() + ".espaceVerts");
            createCache(cm, ma.emsi.smartwatering.domain.Notification.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.EspaceVert.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.EspaceVert.class.getName() + ".zones");
            createCache(cm, ma.emsi.smartwatering.domain.Zone.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Zone.class.getName() + ".notifications");
            createCache(cm, ma.emsi.smartwatering.domain.Zone.class.getName() + ".grandeurs");
            createCache(cm, ma.emsi.smartwatering.domain.Zone.class.getName() + ".plantages");
            createCache(cm, ma.emsi.smartwatering.domain.Zone.class.getName() + ".arrosages");
            createCache(cm, ma.emsi.smartwatering.domain.Grandeur.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.TypeSol.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Plante.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Plantage.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.TypePlante.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Installation.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Boitier.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Boitier.class.getName() + ".installations");
            createCache(cm, ma.emsi.smartwatering.domain.Boitier.class.getName() + ".connexions");
            createCache(cm, ma.emsi.smartwatering.domain.Connecte.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Capteur.class.getName());
            createCache(cm, ma.emsi.smartwatering.domain.Arrosage.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
