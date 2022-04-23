package ma.emsi.smartwatering.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.emsi.smartwatering.domain.ExtraUser;
import ma.emsi.smartwatering.repository.ExtraUserRepository;

@Service
public class ExtraUserService {

	@Autowired
	private ExtraUserRepository ExtraUserRepository;
	
	public ExtraUser getExtraUser(String login) {
		for(ExtraUser eUser : ExtraUserRepository.findAll()) {
			if (eUser.getInternalUser().getLogin().equals(login)) {
				return eUser;
			}
		}
		return null;
	}
	
}
