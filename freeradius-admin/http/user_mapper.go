package http

import(
	cfg "freeradius-admin/config"
	"freeradius-admin/domain"
)

func (urd *UserRequestDto) DtoToModel() *domain.UserModel {
	return &domain.UserModel{
		Username: urd.Username,
		Password: urd.Password,
		Groupname: cfg.Domain,
	}
}

func ModelToDto(um *domain.UserModel) *UserResponseDto {
	return &UserResponseDto{
		ID: um.ID,
		Username: um.Username,
	}
}