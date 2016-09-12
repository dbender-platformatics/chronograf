package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	context "golang.org/x/net/context"

	middleware "github.com/go-openapi/runtime/middleware"
)

// GetSourcesIDUserUserIDExplorationsExplorationIDHandlerFunc turns a function with the right signature into a get sources ID user user ID explorations exploration ID handler
type GetSourcesIDUserUserIDExplorationsExplorationIDHandlerFunc func(context.Context, GetSourcesIDUserUserIDExplorationsExplorationIDParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetSourcesIDUserUserIDExplorationsExplorationIDHandlerFunc) Handle(ctx context.Context, params GetSourcesIDUserUserIDExplorationsExplorationIDParams) middleware.Responder {
	return fn(ctx, params)
}

// GetSourcesIDUserUserIDExplorationsExplorationIDHandler interface for that can handle valid get sources ID user user ID explorations exploration ID params
type GetSourcesIDUserUserIDExplorationsExplorationIDHandler interface {
	Handle(context.Context, GetSourcesIDUserUserIDExplorationsExplorationIDParams) middleware.Responder
}

// NewGetSourcesIDUserUserIDExplorationsExplorationID creates a new http.Handler for the get sources ID user user ID explorations exploration ID operation
func NewGetSourcesIDUserUserIDExplorationsExplorationID(ctx *middleware.Context, handler GetSourcesIDUserUserIDExplorationsExplorationIDHandler) *GetSourcesIDUserUserIDExplorationsExplorationID {
	return &GetSourcesIDUserUserIDExplorationsExplorationID{Context: ctx, Handler: handler}
}

/*GetSourcesIDUserUserIDExplorationsExplorationID swagger:route GET /sources/{id}/user/{user_id}/explorations/{exploration_id} getSourcesIdUserUserIdExplorationsExplorationId

Returns the specified data exploration session

A data exploration session specifies query information.


*/
type GetSourcesIDUserUserIDExplorationsExplorationID struct {
	Context *middleware.Context
	Handler GetSourcesIDUserUserIDExplorationsExplorationIDHandler
}

func (o *GetSourcesIDUserUserIDExplorationsExplorationID) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, _ := o.Context.RouteInfo(r)
	var Params = NewGetSourcesIDUserUserIDExplorationsExplorationIDParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(context.Background(), Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}