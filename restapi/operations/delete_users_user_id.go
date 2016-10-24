package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	context "golang.org/x/net/context"

	middleware "github.com/go-openapi/runtime/middleware"
)

// DeleteUsersUserIDHandlerFunc turns a function with the right signature into a delete users user ID handler
type DeleteUsersUserIDHandlerFunc func(context.Context, DeleteUsersUserIDParams) middleware.Responder

// Handle executing the request and returning a response
func (fn DeleteUsersUserIDHandlerFunc) Handle(ctx context.Context, params DeleteUsersUserIDParams) middleware.Responder {
	return fn(ctx, params)
}

// DeleteUsersUserIDHandler interface for that can handle valid delete users user ID params
type DeleteUsersUserIDHandler interface {
	Handle(context.Context, DeleteUsersUserIDParams) middleware.Responder
}

// NewDeleteUsersUserID creates a new http.Handler for the delete users user ID operation
func NewDeleteUsersUserID(ctx *middleware.Context, handler DeleteUsersUserIDHandler) *DeleteUsersUserID {
	return &DeleteUsersUserID{Context: ctx, Handler: handler}
}

/*DeleteUsersUserID swagger:route DELETE /users/{user_id} deleteUsersUserId

This specific user will be removed from the data store

*/
type DeleteUsersUserID struct {
	Context *middleware.Context
	Handler DeleteUsersUserIDHandler
}

func (o *DeleteUsersUserID) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, _ := o.Context.RouteInfo(r)
	var Params = NewDeleteUsersUserIDParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(context.Background(), Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}
